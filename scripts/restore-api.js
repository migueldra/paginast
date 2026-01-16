const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '../app/api');
const apiBackupDir = path.join(__dirname, '../app/_api_backup');

// Función helper para esperar (síncrona)
function sleepSync(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy wait - solo para delays cortos
  }
}

// Restaurar carpeta API después del build
// Usamos copia en lugar de rename para evitar problemas de permisos en Windows
if (fs.existsSync(apiBackupDir)) {
  try {
    // Intentar eliminar el directorio api si existe (con retry)
    if (fs.existsSync(apiDir)) {
      let retries = 3;
      let deleted = false;
      
      while (retries > 0 && !deleted) {
        try {
          fs.rmSync(apiDir, { recursive: true, force: true });
          deleted = true;
          // Pequeño delay para asegurar que el sistema operativo libere el directorio
          sleepSync(100);
        } catch (err) {
          retries--;
          if (retries > 0) {
            sleepSync(200); // Esperar más tiempo antes de reintentar
          } else {
            console.warn('⚠️  Could not delete api directory, will try to copy over it');
          }
        }
      }
    }
    
    // Copiar el backup a api (más confiable que rename en Windows)
    // Si el directorio api aún existe, cpSync lo sobrescribirá
    fs.cpSync(apiBackupDir, apiDir, { recursive: true, force: true });
    
    // Eliminar el backup después de copiar exitosamente
    try {
      fs.rmSync(apiBackupDir, { recursive: true, force: true });
    } catch (err) {
      console.warn('⚠️  Could not delete backup directory, but API folder was restored');
    }
    
    console.log('✅ API folder restored');
  } catch (error) {
    console.error('❌ Error restoring API folder:', error.message);
    console.error('⚠️  You may need to manually restore app/_api_backup to app/api');
    // No hacer exit(1) para no romper el build si esto es opcional
  }
} else {
  console.log('ℹ️  No API backup folder found, skipping restore');
}
