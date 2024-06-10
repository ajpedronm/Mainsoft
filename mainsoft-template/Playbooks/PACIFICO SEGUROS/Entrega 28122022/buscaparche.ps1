PARAM(
	$archivoSalida = "salida_servers.txt"
)
"">$archvioSalida

$cred = Get-Credential ITAUCHILE\cort5954
$carpetaTrabajo = "d:\microsoft\powershell\ramsonware"
$hotfix = "kb4012212"
  
$servers = gc "$carpetaTrabajo\pendientes.txt"
$ErrorActionPreference = "SilentlyContinue"
 
foreach($server in $servers)
{
    $mensaje = "Verificando hotfix $hotfix en $server`,"
    Write-Host $mensaje -NoNewline
    
    if (Test-Connection $server -Quiet -Count 1)
    {
        Get-HotFix -ComputerName $server -Id $hotfix -Credential $cred | out-null
        if ($?)
        {
            Write-Host "Instalado"
		$mensaje+= "Instalado"
        }
        else
        {
            if ($error[0].FullyQualifiedErrorId -eq "GetHotFixNoEntriesFound,Microsoft.PowerShell.Commands.GetHotFixCommand")
           {
                Write-Host "No Instalado"
		$mensaje+= "No Instalado"
            }
            else 
            {
                Write-Host "Error WMI"
		$mensaje+= "Error WMI"
            }
        }
    }
    else
    {
        Write-Host "Error Ping"
        $mensaje+= "Error Ping"
    }
 
	$mensaje >> $archivoSalida
}

write-host "Se han registrado los resultados en el archivo $archivoSalida" -foreground Yellow
 
