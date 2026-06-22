# Publishing Guide for OPRAIZ IDECODE Releases

This guide details the steps to release OPRAIZ IDECODE.

## Release Process

1. **Prepare the release:**
   - Ensure all changes are merged to `main`.
   - Update `CHANGELOG.md` with the new version and release date.
   - Verify `npm run compile` and `npm run lint` pass.
   - Run `npm run test:opraiz` and ensure all tests pass.
   - Run `npm run build:browser` to verify bundling.

2. **Publish npm packages:**
   ```sh
   # From the repository root
   npm run publish:prepare   # (if available) or use lerna publish
   npx lerna publish from-package --no-private
   ```

3. **Create a GitHub Release:**
   - Tag the release: `git tag v<version>`
   - Push the tag: `git push origin v<version>`
   - Create a Release on GitHub with release notes summarizing changes.

4. **Post-release:**
   - Update the `[Unreleased]` section in `CHANGELOG.md`.
   - Verify all packages are published on npm under `@opraiz/*`.
   - Update the `main` branch with any version bumps.

## Notes

- All packages are scoped under `@opraiz/`.
- The workspace uses Lerna for monorepo management.
- NPM packages are published from CI via `publish-ci.yml` workflow.
- For patch releases, cherry-pick fixes onto `main` and follow steps 2-4.
