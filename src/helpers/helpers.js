const hbs = require('hbs');

hbs.registerHelper('mostrarr', (listado)=>{
	let texto= '';

   texto=texto + 
   '<form action="/eliminar" method="post"><table class="table table-striped table-hover">\
    <thead>\
    <th>Documento</th>\
    <th>Nombre</th>\
    <th>correo</th>\
    <th>telefono</th>\
    <th></th>\
  </thead>\
  <tbody>';
listado.forEach(estudiante=>{
    texto=texto + 
    ' <tr>\
      <td>'+estudiante.documento+'</td>\
      <td>'+estudiante.nombre+'</td>\
      <td>'+estudiante.correo+'</td>\
      <td>'+estudiante.telefono+'</td>\
      <td> <button class="btn btn-danger" name="documento" value="'+estudiante.documento+'">Eliminar</button></td>\
    </tr>';
})
  texto=texto + '</tbody>\
</table></form>';

  texto=texto +'';
  return texto
});


hbs.registerHelper('mostrarinscritos', (listadoinscritos)=>{
  let texto= '';

   texto=texto + 
   '<form action="/eliminar" method="post"><table class="table table-striped table-hover">\
    <thead>\
    <th>Nombre</th>\
    <th>curso</th>\
    <th>telefono</th>\
    <th></th>\
  </thead>\
  <tbody>';
listadoinscritos.forEach(estudiante=>{

    texto=texto + 
    ' <tr>\
      <td>'+estudiante.documento+'</td>\
      <td>'+estudiante.idcurso+'</td>\
      <td> <button class="btn btn-danger" name="documento" value="'+estudiante.iddocumento+'">Eliminar</button></td>\
    </tr>';
})
  texto=texto + '</tbody>\
</table></form>';

  texto=texto +'';
  return texto
});



hbs.registerHelper('mostrarCurso', (listadocursos)=>{
  let texto= '';

   texto=texto + 
   '<form action="/eliminarcurso" method="post"><table class="table table-striped table-hover">\
    <thead>\
    <th>ID curso</th>\
    <th>Nombre</th>\
    <th>descripcion</th>\
    <th>valor</th>\
    <th>modalidad</th>\
    <th>intencidad</th>\
    <th>Estado</th>\
    <th></th>\
  </thead>\
  <tbody>';
listadocursos.forEach(curso=>{
  if(curso.estado){
    estado='Disponible';
  }else{
    estado='Cerrado';
  }
    texto=texto + 
    ' <tr>\
      <td>'+curso.idcurso+'</td>\
      <td>'+curso.nombre+'</td>\
      <td>'+curso.descripcion+'</td>\
      <td>'+curso.valor+'</td>\
      <td>'+curso.modalidad+'</td>\
      <td>'+curso.intencidad+'</td>\
      <td>'+estado+'</td>\
      <td> <button class="btn btn-danger" name="idcurso" value="'+curso.idcurso+'">Eliminar</button></td>\
    </tr>';
})
  texto=texto + '</tbody>\
</table></form>';

  texto=texto +'';
  return texto
});


hbs.registerHelper('cursosDisponibles', (listadodisponible) => {

  let texto = '';
    
   listadodisponible.forEach(curso=>{

      
      texto += `<div class="col-md-4 mb-2">
                  <div class="card">
                    <h5 class="card-header">${curso.nombre}</h5>
                    <div class="card-body">
                      <p class="card-title text-muted">Valor: $${curso.valor}</p>
                      <p class="card-text">Descipción: ${curso.descripcion}</p>
                      <button class="btn btn-secondary btn-block" data-toggle="modal" data-target="#modal_${curso.idcurso}">Ver más</button>
                    </div>
                  </div>
                </div>
                <div class="modal fade" id="modal_${curso.idcurso}" tabindex="-1" role="dialog" aria-labelledby="modalLabel${curso.idcurso}" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel${curso.idcurso}">${curso.nombre}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p>Descripición: ${curso.descripcion}</p>
                        <p>Modalidad: ${curso.modalidad}</p>
                        <p>Duración: ${curso.intensidad} horas </p>
                        <h6>Valor: $${curso.valor}</h6>

                        <p class="bg-warning"> Para inscribirse en un curso debe estar registrado </p>
                      </div>
                      <div class="modal-footer">
                        
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>`
        ;
    }); 
    return texto;
  });

hbs.registerHelper('cursosInscribir', (listadoselect) => {
  

  let texto = '';

   listadoselect.forEach(curso=>{
    texto += `<option value="${curso.idcurso}">${curso.nombre}</option>`;
  });

  return texto;
});