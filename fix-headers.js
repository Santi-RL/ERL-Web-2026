const fs = require('fs');
const path = require('path');

// Obtener lista de archivos HTML excepto los en src/components y public/components
const htmlFiles = fs.readdirSync('.')
  .filter(file => file.endsWith('.html') && !file.startsWith('index'));

// Procesar cada archivo HTML
htmlFiles.forEach(file => {
  console.log(`Procesando ${file}...`);
  
  // Leer el contenido del archivo
  const filePath = path.join('.', file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Verificar si contiene el problema de código adicional después del header-placeholder
  if (content.includes('<div id="header-placeholder"></div>') && 
      content.includes('<a href="contacto.html" data-nav="contacto" class="btn btn-outline-primary w-full mt-2">')) {
    
    // Reemplazar el código problemático
    const correctedContent = content.replace(
      /<div id="header-placeholder"><\/div>\s*<a href="contacto\.html" data-nav="contacto" class="btn btn-outline-primary w-full mt-2">Agenda tu Consulta<\/a>\s*<\/nav>\s*<\/div>\s*<\/header>/s,
      '<div id="header-placeholder"></div>'
    );
    
    // Guardar el archivo corregido
    fs.writeFileSync(filePath, correctedContent, 'utf8');
    console.log(`✓ ${file} corregido exitosamente`);
  } else {
    console.log(`- ${file} no necesita corrección o tiene un formato diferente`);
  }
});

console.log('Proceso completado.');