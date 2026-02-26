$root = "C:\Users\HamzaRafique\callcenter-site"
$files = Get-ChildItem -Path $root -Recurse -Include "*.tsx","*.ts","*.css" |
  Where-Object { $_.FullName -notmatch 'node_modules|\.next' }

$replacements = @(
  @('blue-950', 'emerald-950'),
  @('blue-900', 'emerald-900'),
  @('blue-800', 'emerald-800'),
  @('blue-700', 'emerald-700'),
  @('blue-600', 'emerald-600'),
  @('blue-500', 'emerald-500'),
  @('blue-400', 'emerald-400'),
  @('blue-300', 'emerald-300'),
  @('blue-200', 'emerald-200'),
  @('blue-100', 'emerald-100'),
  @('blue-50(?!\d)', 'emerald-50'),
  @('cyan-500', 'teal-500'),
  @('cyan-400', 'teal-400'),
  @('cyan-300', 'teal-300'),
  @('#2563EB', '#059669'),
  @('#2563eb', '#059669'),
  @('#06b6d4', '#0d9488')
)

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
  foreach ($r in $replacements) {
    $content = $content -replace $r[0], $r[1]
  }
  [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
  Write-Host "Updated: $($file.Name)"
}
Write-Host "Done - all colors replaced."
