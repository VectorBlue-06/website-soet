# convert-images-to-webp.ps1
# Scans images/ recursively and converts JPG/JPEG files to WebP using available tools.
# Usage: run from repository root in PowerShell: `.	ools\convert-images-to-webp.ps1`

$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$images = Join-Path $root 'images'

function Find-Tool {
    param($names)
    foreach($n in $names) {
        $cmd = Get-Command $n -ErrorAction SilentlyContinue
        if($cmd) { return $n }
    }
    return $null
}

$tool = Find-Tool -names @('cwebp','magick')
if (-not $tool) {
    Write-Output "No conversion tool found (cwebp or magick). Please install Google WebP tools or ImageMagick and rerun."
    exit 1
}

Write-Output "Using conversion tool: $tool"

Get-ChildItem -Path $images -Recurse -Include *.jpg,*.jpeg -File | ForEach-Object {
    $src = $_.FullName
    $dest = [System.IO.Path]::ChangeExtension($src, '.webp')
    if (Test-Path $dest) { Write-Output "Skipping (already exists): $dest"; return }
    if ($tool -eq 'cwebp') {
        & cwebp -q 80 "$src" -o "$dest"
    } else {
        & magick convert "$src" "$dest"
    }
    if (Test-Path $dest) { Write-Output "Converted: $src -> $dest" } else { Write-Output "Failed: $src" }
}

Write-Output "Conversion complete. Next: update HTML/CSS references from .jpg/.jpeg to .webp (manual step recommended)."
