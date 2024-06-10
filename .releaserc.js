const commitAnalyzer = {
  preset: 'conventionalcommits',
  releaseRules: [
    { type: 'docs', scope: 'README', release: 'patch' },
    { type: 'ci', scope: 'patch', release: 'patch' },
    { type: 'ci', scope: 'major', release: 'major' },
    { type: 'ci', scope: 'minor', release: 'minor' },
  ],
}

const releaseNotes = {
  preset: 'conventionalcommits',
}

const changelog = {
  presetConfig: {
    header:
      '# 📝 Changelog\n\nAll notable changes to this project will be documented in this file.',
  },
}

const npm = {
  npmPublish: true,
}

const git = {
  message:
    "release: :bookmark: ${nextRelease.version} <%= new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) %> [skip ci]\n\n${nextRelease.notes}",
  assets: [
    'dist/**',
    'package.json',
    'pnpm-lock.yaml',
    'CHANGELOG.md',
    'docs/**',
  ],
}

/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    'main',
    {
      name: 'alpha',
      prerelease: true,
    },
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', commitAnalyzer],
    ['@semantic-release/release-notes-generator', releaseNotes],
    ['@semantic-release/changelog', changelog],
    ['semantic-release-pnpm', npm],
    '@semantic-release/github',
    ['@semantic-release/git', git],
  ],
}
