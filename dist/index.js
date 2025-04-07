var f = Object.defineProperty;
var m = (t, e, a) => e in t ? f(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var i = (t, e, a) => m(t, typeof e != "symbol" ? e + "" : e, a);
import { writeFileSync as d } from "fs";
import { join as g } from "path";
class h {
  constructor() {
    i(this, "params", {});
    i(this, "data");
  }
}
function c(t, e = "post") {
  return async (a) => fetch(`https://elibrary.ferc.gov/eLibrarywebapi/api/${t}`, {
    headers: {
      "content-type": "application/json"
    },
    method: e,
    ...e !== "get" ? { body: JSON.stringify(a) } : {}
  }).then((s) => s.json());
}
const u = {
  dockets: "rp24-769",
  subdockets: "000",
  filed_date_beg: "01-01-1960",
  filed_date_end: "06-04-2024",
  complete_flag: 0,
  numHits: 100,
  pageNumber: 0
};
class D extends h {
  constructor(a) {
    super();
    i(this, "defaultParams", u);
    i(this, "fetch", c("Docket/GetSingleDocketSheet"));
    this.params = { ...this.defaultParams, ...a };
  }
  async getData() {
    this.data = await this.fetch(this.params);
  }
  updateParams(a) {
    this.params = { ...u, ...a };
  }
  async nextPage() {
    var r;
    const { numHits: a, pageNumber: s } = this.params;
    return (((r = this.data) == null ? void 0 : r.Page.totalHits) ?? -1) > a * (s + 1) ? (this.params.pageNumber++, await this.getData(), !0) : !1;
  }
  async prevPage() {
    const { pageNumber: a } = this.params;
    return a > 0 ? (this.params.pageNumber--, await this.getData(), !0) : !1;
  }
}
const o = {
  by: "rbFilingDate",
  start: "06-04-2024",
  end: "06-04-2024"
};
class S extends h {
  constructor(a) {
    super();
    i(this, "defaultParams", o);
    i(this, "fetch", c(""));
    this.params = { ...this.defaultParams, ...a }, this.setFetch();
  }
  setFetch() {
    this.fetch = c(
      `Docket/GetATMSdocs/${this.params.by}/${this.params.start}/${this.params.end}/DocketFullNumber`,
      "get"
    );
  }
  async getData() {
    this.data = await this.fetch({});
  }
  updateParams(a) {
    this.params = { ...o, ...a }, this.setFetch();
  }
}
const l = {
  searchText: "*",
  searchFullText: !0,
  searchDescription: !0,
  dateSearches: [],
  availability: null,
  affiliations: [],
  categories: [],
  libraries: [],
  accessionNumber: null,
  eFiling: !1,
  docketSearches: [
    {
      docketNumber: "P-15056-000",
      subDocketNumbers: []
    }
  ],
  resultsPerPage: 100,
  curPage: 1,
  classTypes: [],
  sortBy: "",
  groupBy: "NONE",
  idolResultID: "",
  allDates: !1
};
class w extends h {
  constructor(a) {
    super();
    i(this, "defaultParams", l);
    i(this, "fetch", c("Search/AdvancedSearch"));
    this.params = { ...this.defaultParams, ...a }, this.params.curPage === 0 && (this.params.curPage = 1);
  }
  async getData() {
    this.data = await this.fetch(this.params);
  }
  updateParams(a) {
    this.params = { ...l, ...a };
  }
  async nextPage() {
    var r;
    const { resultsPerPage: a, curPage: s } = this.params;
    return (((r = this.data) == null ? void 0 : r.totalHits) ?? -1) > a * s ? (this.params.curPage++, await this.getData(), !0) : !1;
  }
  async prevPage() {
    const { curPage: a } = this.params;
    return a > 1 ? (this.params.curPage--, await this.getData(), !0) : !1;
  }
}
const n = {
  path: "temp",
  format: "pdf",
  file: "temp"
};
async function F(t, e) {
  const a = {
    ...n,
    file: t.fileidLst[0] ?? n.file,
    ...e
  };
  return p(a, "File/DownloadP8File", {}, t);
}
async function N(t, e) {
  const a = {
    ...n,
    file: t,
    ...e
  };
  return p(
    a,
    "File/DownloadPDF",
    { accessionNumber: t },
    '{serverLocation: ""}'
  );
}
async function p(t, e, a, s) {
  return fetch(
    `https://elibrary.ferc.gov/eLibrarywebapi/api/${e}?` + new URLSearchParams(a),
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json"
      },
      body: typeof s == "string" ? s : JSON.stringify(s),
      method: "POST"
    }
  ).then((r) => r.arrayBuffer()).then(
    (r) => d(
      g(t.path, `${t.file}.${t.format}`),
      Buffer.from(r),
      "binary"
    )
  );
}
export {
  D as DocketSearch,
  w as GeneralSearch,
  S as NewDocketSearch,
  F as downloadFile,
  N as generatePDF
};
