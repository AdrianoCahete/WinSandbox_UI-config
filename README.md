# Windows Sandbox Web UI Config

A simple web app built for generate **Windows Sandbox** configuration files (.wsb).

## Development

```bash
npm i && npm run dev
```

## Configuration Options

The application provides controls for Windows Sandbox settings:

1. **vGPU (Virtual GPU)** - Enable or disable GPU virtualization sharing. When enabled, the sandbox can share the host's GPU for hardware acceleration. *(Default: Disable, Options: Enable/Disable)*
2. **Networking** - Control network access for the sandbox. When disabled, the sandbox will have no network connectivity. *(Default: Enable, Options: Enable/Disable)*
3. **Audio Input** - Control whether the sandbox can access the host's microphone. *(Default: Disable, Options: Enable/Disable)*
4. **Video Input** - Control whether the sandbox can access the host's camera. *(Default: Disable, Options: Enable/Disable)*
5. **Protected Client** - Adds additional security hardening to the sandbox. When enabled, provides extra isolation for sensitive operations. *(Default: Disable, Options: Enable/Disable)*
6. **Printer Redirection** - Control whether the sandbox can access the host's printers. *(Default: Disable, Options: Enable/Disable)*
7. **Clipboard Redirection** - Control clipboard sharing between the sandbox and the host. *(Default: Enable, Options: Enable/Disable)*
8. **Memory (MB)** - Amount of memory to allocate to the sandbox in megabytes. *(Default: 4096 MB, Range: 1024-16384)*
9. **Mapped Folders** - Share folders from the host with the sandbox. Supports multiple folder mappings with read/write permissions and environment variables (Windows 11 23H2+)
10. **Logon Command** - A command that executes automatically when the sandbox starts

> **Source:** [Microsoft Windows Sandbox Configuration Documentation](https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-configure-using-wsb-file)

### Profiles

The application includes pre-configured profiles for different use cases:

| Property | Default (MS) | Balanced | Community | Secure | Options |
|----------|-------------|----------|-----------|--------|---------|
| **vGPU** | ❌ Disable | ✅ Enable | ✅ Enable | ❌ Disable | ✅ Enable / ❌ Disable |
| **Networking** | ✅ Enable | ✅ Enable | ✅ Enable | ❌ Disable | ✅ Enable / ❌ Disable |
| **AudioInput** | ❌ Disable | ❌ Disable | ✅ Enable | ❌ Disable | ✅ Enable / ❌ Disable |
| **VideoInput** | ❌ Disable | ❌ Disable | ❌ Disable | ❌ Disable | ✅ Enable / ❌ Disable |
| **ProtectedClient** | ❌ Disable | ✅ Enable | ❌ Disable | ✅ Enable | ✅ Enable / ❌ Disable |
| **PrinterRedirection** | ❌ Disable | ❌ Disable | ✅ Enable | ❌ Disable | ✅ Enable / ❌ Disable |
| **ClipboardRedirection** | ✅ Enable | ✅ Enable | ✅ Enable | ❌ Disable | ✅ Enable / ❌ Disable |
| **MemoryInMB** | 4096 | 4096 | 4096 | 2048 | 1024-16384 |
| **MappedFolders** | [] | [] | [] | [] | Custom array |
| **LogonCommand** | Empty | Empty | Empty | Empty | Custom command |

**Profile Descriptions:**
- **Default**: Microsoft's default Windows Sandbox configuration
- **Balanced**: Balanced security with essential features enabled - recommended for most users
- **Community**: Balanced configuration for general usage and testing
- **Secure**: Maximum security settings with minimal host interaction

## Made with
- Nuxt + NuxtUI
