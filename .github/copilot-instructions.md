# AI Agent Instructions

## General Guidelines

### Verbosity
- Keep responses concise and focused
- Do not over-explain code unless explicitly asked
- Provide direct answers without excessive elaboration
- Code should be self-documenting when possible

### Emoji Usage
- **FORBIDDEN** in all code files
- **FORBIDDEN** in changelogs
- **FORBIDDEN** in commit messages
- **FORBIDDEN** in configuration files
- **ALLOWED ONLY** in README.md tables (for visual clarity in feature comparison)
- Do not use emoji in file names, variable names, or comments

### Code Style
- Follow existing patterns in the codebase
- Use TypeScript strict typing
- Maintain consistency with Nuxt 3 and Vue 3 composition API
- Keep components modular and reusable

### Documentation
- Update README.md when adding new features
- Keep documentation accurate and up-to-date
- Use clear, professional language
- No decorative elements in documentation unless in README tables

## Project-Specific Rules

### Vue Components
- Use `<script setup lang="ts">` syntax
- Prefer composition API over options API
- Keep template logic minimal
- Extract complex logic to composables or utilities

### Nuxt UI Components
- Use Nuxt UI components consistently
- Follow Nuxt UI design patterns
- Maintain accessibility standards
- Reference official documentation when needed

### Configuration Files
- Keep JSON files properly formatted
- Validate against Microsoft's WSB schema
- Maintain backward compatibility with all profiles
- Document new properties in properties.json

### Git Workflow
- Write clear, imperative commit messages
- No emoji in commits or changelogs
- Keep commits focused and atomic
- Update relevant documentation in the same commit
