Awesome — with the repo now forked and cloned locally, here’s your updated **comprehensive project planning document** for building your **FERC CP Order Monitoring Tool**, tailored to your workflow using **JavaScript**, **Cursor**, and your **Debian virtual machine**.

---

# 📘 Project Planning Document: FERC CP Order Monitor

> **Primary Objective**: Automatically search for and download “Order Issuing Certificate” documents under **CP dockets** from FERC's eLibrary, and alert the team when new orders are posted.

---

## 📁 Project Structure

**Root Directory**: your fork of `ferc-elibrary-api`

You'll add your scripts and utilities in a `scripts/` folder within the cloned repo:

```
ferc-elibrary-api/
├── scripts/
│   ├── search_cp_orders.js       # Main logic
│   ├── download_util.js          # Handles PDF downloads
│   ├── notifier.js               # Email/Slack alerts (optional)
│   └── config.js                 # Central config for filtering, output, etc.
├── .env                          # Secrets (not committed)
├── package.json
├── README.md
```

---

## ✅ Development Checklist

### 📦 Dependencies

Install all required modules:

```bash
npm install dayjs dotenv nodemailer
```

(Optional): `axios`, `fs-extra`, or `commander` if you later modularize or add CLI support.

---

## ⚙️ Configuration

### `.env` (not committed to Git)

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=alertbot@example.com
EMAIL_PASS=yourpassword
EMAIL_TO=team@example.com
```

---

## 🧠 Cursor IDE Notes

- Use `cursor .` in your terminal to launch Cursor inside the repo.
- Highlight logic blocks and ask Cursor for:
  - **Refactoring** suggestions
  - **Error handling** improvements
  - **Explanations**
- Use inline documentation in `scripts/` to generate help context.

---

## 📜 File-by-File Goals

### `scripts/search_cp_orders.js`
- Set up a rolling **24-hour date range** using `dayjs`.
- Perform a `DocketSearch` with `docketNumber: "CP"` and `text: "Order Issuing Certificate"`.
- Filter results by title and date.
- Log results with links to eLibrary.
- Call:
  - `download_util.downloadOrderPDF(order)`
  - `notifier.sendAlert(order)` (optional)

---

### `scripts/download_util.js`
- Export `downloadOrderPDF(order)` function.
- Sanitize filename from `order.title`.
- Use `downloadFile()` (already implemented in the repo).
- Store PDFs in `downloads/` (create if needed).

---

### `scripts/notifier.js` *(Optional but recommended)*
- Use `nodemailer` to send alerts.
- Export `sendAlert(order)` that:
  - Emails subject + title
  - Attaches link and date
  - Optionally includes the PDF (or notifies that it’s downloaded)

---

### `scripts/config.js`
- Central place for shared settings:
  - Document types to look for
  - Output paths
  - Logging verbosity

```js
module.exports = {
  keyword: "Order Issuing Certificate",
  docketPrefix: "CP",
  downloadDir: "downloads",
};
```

---

## 🧪 Testing Strategy

1. Override the date range manually to verify behavior.
2. Test file downloads with known accession numbers:
   - e.g. `20250402-3057`
3. Simulate a new order to test email/notification logic.
4. Log everything for now → upgrade to alerting once stable.

---

## 🕐 Daily Execution (Automation)

### Create Cron Entry:

```bash
crontab -e
```

Add:

```bash
0 7 * * * /usr/bin/node /home/youruser/ferc-elibrary-api/scripts/search_cp_orders.js >> /home/youruser/ferc-elibrary-api/logs/output.log 2>&1
```

---

## 📈 Future Enhancements

| Feature | Benefit |
|--------|---------|
| Store state in SQLite or JSON | Avoid re-downloading previously seen orders |
| Slack/Teams alerts | Non-intrusive team alerts |
| Web dashboard | Central view of recent orders |
| API layer | Interact from other services or UIs |

---
