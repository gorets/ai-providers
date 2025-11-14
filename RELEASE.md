# Release Process

This document describes how to release a new version of `@gorets/ai-providers` to npm.

## Prerequisites

1. **NPM Account**: You need an npm account with publish access to `@gorets/ai-providers`
2. **NPM Token**: Set up `NPM_TOKEN` secret in GitHub repository settings
   - Go to [npmjs.com](https://www.npmjs.com/) → Account → Access Tokens
   - Create new **Automation** token (for CI/CD)
   - Add to GitHub: Repository Settings → Secrets and variables → Actions → New repository secret
   - Name: `NPM_TOKEN`, Value: your token

## Release Steps

### 1. Update Version

Update version in `package.json` following [Semantic Versioning](https://semver.org/):

```bash
# For bug fixes and patches
npm version patch   # 1.0.0 → 1.0.1

# For new features (backwards compatible)
npm version minor   # 1.0.0 → 1.1.0

# For breaking changes
npm version major   # 1.0.0 → 2.0.0

# For pre-release versions
npm version 1.1.0-beta.1
```

Or manually edit `package.json`:
```json
{
  "version": "1.1.0"
}
```

### 2. Update Changelog (Optional)

Update `README.md` or create `CHANGELOG.md` with release notes:
```markdown
## [1.1.0] - 2025-11-14

### Added
- New provider: Cohere models
- Support for audio input/output capabilities

### Changed
- Updated OpenAI pricing for GPT-5.1 models

### Fixed
- Fixed incorrect context window for Gemini 2.5 Pro
```

### 3. Commit and Push

```bash
git add package.json README.md
git commit -m "chore: bump version to 1.1.0"
git push origin main
```

### 4. Create GitHub Release

#### Option A: Via GitHub UI (Recommended)

1. Go to [Releases](https://github.com/gorets/ai-providers/releases)
2. Click "Draft a new release"
3. Click "Choose a tag" → Type `v1.1.0` (must match package.json version)
4. Click "Create new tag: v1.1.0 on publish"
5. Set release title: `v1.1.0` or `Release 1.1.0`
6. Add release notes (GitHub can auto-generate from commits)
7. Check "Set as the latest release"
8. Click "Publish release"

#### Option B: Via GitHub CLI

```bash
gh release create v1.1.0 \
  --title "v1.1.0" \
  --notes "Release notes here" \
  --latest
```

#### Option C: Via Git Tag + Push

```bash
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
# Then create release from tag on GitHub
```

### 5. Automated Publishing

Once the release is published:

1. ✅ **GitHub Actions** automatically triggers `publish-npm.yml` workflow
2. ✅ Workflow builds the package and generates data files
3. ✅ Package is published to npm with **provenance** (supply chain security)
4. ✅ Release notes are updated with npm package link

**Monitor the workflow**: [Actions](https://github.com/gorets/ai-providers/actions)

### 6. Verify Publication

Check that the package was published successfully:

```bash
# Check on npm
npm view @gorets/ai-providers

# Install and test
npm install @gorets/ai-providers@1.1.0
```

Or visit: https://www.npmjs.com/package/@gorets/ai-providers

## Pre-Release / Beta Versions

For testing before official release:

```bash
# 1. Update version with pre-release tag
npm version 1.1.0-beta.1

# 2. Commit and push
git add package.json
git commit -m "chore: bump version to 1.1.0-beta.1"
git push origin main

# 3. Create pre-release on GitHub
gh release create v1.1.0-beta.1 \
  --title "v1.1.0-beta.1" \
  --notes "Beta release for testing" \
  --prerelease

# 4. GitHub Actions will publish with 'beta' tag
# Install with: npm install @gorets/ai-providers@beta
```

## Version Naming Convention

- **Stable releases**: `v1.0.0`, `v1.1.0`, `v2.0.0`
- **Beta releases**: `v1.1.0-beta.1`, `v1.1.0-beta.2`
- **Release candidates**: `v1.1.0-rc.1`, `v1.1.0-rc.2`
- **Alpha releases**: `v1.1.0-alpha.1`

Always prefix with `v` for Git tags, but not in `package.json`.

## Troubleshooting

### Publication Failed

1. Check GitHub Actions logs
2. Verify `NPM_TOKEN` secret is set correctly
3. Verify npm account has publish permissions
4. Check package name availability on npm

### Version Mismatch

If Git tag version doesn't match `package.json`:
```bash
# Delete the tag
git tag -d v1.1.0
git push origin :refs/tags/v1.1.0

# Fix package.json, commit, and recreate tag
```

### Rollback Release

If you need to unpublish (within 72 hours):
```bash
npm unpublish @gorets/ai-providers@1.1.0
```

⚠️ **Note**: Unpublishing is discouraged. Instead, publish a new patch version with fixes.

## Automated Checks

Our CI/CD includes:
- ✅ **Version format validation** (semver compliance)
- ✅ **Data consistency check** (JSON matches TypeScript)
- ✅ **Build verification** (TypeScript compiles)
- ✅ **Package integrity** (can be packed)
- ✅ **Provenance** (npm supply chain security)

## NPM Provenance

We publish with `--provenance` flag which provides:
- 🔒 Cryptographic proof of package origin
- 🔍 Transparent build process
- 🛡️ Supply chain security
- 📝 Links to source code and build logs

See: https://docs.npmjs.com/generating-provenance-statements
