function Medicamentos(codigo_medicamento, nom_medicamento_comercial, nom_medicamento_generico, concentracion_medicamento, nom_laboratorio, presentacion_medicamento, lote_medicamento, fecha_medicamento, conservacion_medicamento) {
    this.codigo_medicamento = codigo_medicamento;
    this.nom_medicamento_comercial = nom_medicamento_comercial;
    this.nom_medicamento_generico = nom_medicamento_generico;
    this.concentracion_medicamento = concentracion_medicamento;
    this.nom_laboratorio = nom_laboratorio;
    this.presentacion_medicamento = presentacion_medicamento;
    this.lote_medicamento = lote_medicamento;
    this.fecha_medicamento = fecha_medicamento;
    this.conservacion_medicamento = conservacion_medicamento;
};

$(document).ready(function () {
    
    var base = openDatabase('MyDB', '1.0', 'Almacemiento de medicamentos', 2 * 1024 * 1024);
    var sql = "CREATE TABLE IF NOT EXISTS Medicamentos(codigo_medicamento integer primary key ";
        sql += "autoincrement,nom_medicamento_comercial,nom_medicamento_generico,concentracion_medicamento,nom_laboratorio,presentacion_medicamento,lote_medicamento,fecha_medicamento,conservacion_medicamento)";
    base.transaction(function (t) {
        t.executeSql(sql);
    });
    
    mostrar(base);

    $("#btnGuardar").click(function(){
        Guardar(objeto(),base);
        mostrar(base);
        limpiar();        
    });

    $("#btnActualizar").click(function ( ) {
        Actualizar(objeto(),base);
        mostrar(base);
        limpiar();
    });

    $("btnCancelar").click(function (){
        limpiar();
        $("#btnGuardar").css("display","block");
        $("#Actualizar").css("display","none");
        $("#Cancelar").css("display","none");
    });
});

function objeto(){
    var medicamentos = new Medicamentos(
        
        parseInt($("#codigo_medicamento").val()),
        $("#nom_medicamento_comercial").val(),
        $("#nom_medicamento_generico").val(),
        $("#concentracion_medicamento").val(),
        $("#nom_laboratorio").val(),
        $("#presentacion_medicamento").val(),
        $("#lote_medicamento").val(),
        $("#fecha_medicamento").val(),
        $("#conservacion_medicamento").val()
    );
    console.log(medicamentos);
    return medicamentos;
}

function Guardar(medicamentos,base) {
    if(medicamentos.nom_medicamento_comercial != '' &&
       medicamentos.nom_medicamento_generico != '' && medicamentos.concentracion_medicamento != '' &&
       medicamentos.nom_laboratorio != '' && medicamentos.presentacion_medicamento != '' &&
       medicamentos.lote_medicamento != '' && medicamentos.fecha_medicamento != '' && medicamentos.conservacion_medicamento != ''){

        base.transaction(function (t) {
            var sql = "INSERT INTO Medicamentos (nom_medicamento_comercial,nom_medicamento_generico,concentracion_medicamento,nom_laboratorio,presentacion_medicamento,lote_medicamento,fecha_medicamento,conservacion_medicamento)";
                sql += "VALUES (?,?,?,?,?,?,?,?)";
                
            t.executeSql(sql,
                [medicamentos.nom_medicamento_comercial,
                medicamentos.nom_medicamento_generico,medicamentos.concentracion_medicamento,
                medicamentos.nom_laboratorio,medicamentos.presentacion_medicamento,
                medicamentos.lote_medicamento,medicamentos.fecha_medicamento,medicamentos.conservacion_medicamento]
                );
                alert("Medicamento guardado con exito!");
        });
       
    }else{
        alert("Algunos Campos son obligatorios");
    }
}

function Eliminar(codigo_medicamento, base) {
    base.transaction(function (t) {
        t.executeSql("DELETE FROM Medicamentos WHERE codigo_medicamento = " +codigo_medicamento);
    });
}

function Actualizar(medicamentos, base) {
    base.transaction(function (t) {
        var sql = "UPDATE Medicamentos SET nom_medicamento_comercial = ?,nom_medicamento_generico = ?,concentracion_medicamento = ?,nom_laboratorio = ?";
            sql += "presentacion_medicamento = ?,lote_medicamento = ?,fecha_medicamento = ?,conservacion_medicamento = ? WHERE codigo_medicamento = ?";
        t.executeSql(sql,
            [medicamentos.nom_medicamento_comercial,
                medicamentos.nom_medicamento_generico,medicamentos.concentracion_medicamento,
                medicamentos.nom_laboratorio,medicamentos.presentacion_medicamento,
                medicamentos.lote_medicamento,medicamentos.fecha_medicamento,medicamentos.conservacion_medicamento,
                medicamentos.codigo_medicamento]
        );
        console.log(medicamentos.nom_medicamento_comercial);
    });
}

function mostrarCodigo(codigo_medicamento, base) {
    base.transaction(function (t) {
        t.executeSql("SELECT * FROM Medicamentos WHERE codigo_medicamento="+codigo_medicamento,[],function (t,resultado) {
            $("#codigo_medicamento").val(resultado.rows.item(0).codigo_medicamento);
            $("#nom_medicamento_comercial").val(resultado.rows.item(0).nom_medicamento_comercial);
            $("#nom_medicamento_generico").val(resultado.rows.item(0).nom_medicamento_generico);
            $("#concentracion_medicamento").val(resultado.rows.item(0).concentracion_medicamento);
            $("#nom_laboratorio").val(resultado.rows.item(0).nom_laboratorio);
            $("#presentacion_medicamento").val(resultado.rows.item(0).presentacion_medicamento);
            $("#lote_medicamento").val(resultado.rows.item(0).lote_medicamento);
            $("#fecha_medicamento").val(resultado.rows.item(0).fecha_medicamento);
            $("#conservacion_medicamento").val(resultado.rows.item(0).conservacion_medicamento);
        })
    })
}

function mostrar(base){
    base.transaction(function(t){
        t.executeSql("SELECT * FROM Medicamentos", [], function (t, resultado) {
            var cabecera = "<tr>"+
            "<th>Codgio</th>"+
            "<th>Nombre Comercial</th>"+
            "<th>Nombre Generico</th>"+
            "<th>Concentracion</th>"+
            "<th>Nombre Laboratorio</th>"+
            "<th>Lote</th>"+
            "<th>Fecha Vencimineto</th>"+
            "<th>Presentacion</th>"+
            "<th>Conservacion</th>"+
            "<th>Modificar</th>"+
            "<th>Eliminar</th>"+
            "</tr>";
            var cuerpo = "";
            
            for( var i = 0; i < resultado.rows.length; i++){
                cuerpo += "<tr>";
                cuerpo += "<td>" + resultado.rows.item(i).codigo_medicamento + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).nom_medicamento_comercial + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).nom_medicamento_generico + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).concentracion_medicamento + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).nom_laboratorio + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).lote_medicamento + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).fecha_medicamento + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).presentacion_medicamento + "</td>";
                cuerpo += "<td>" + resultado.rows.item(i).conservacion_medicamento + "</td>";
                cuerpo += "<td><spam class='modificar' data-modificar='"+resultado.rows.item(i).codigo_medicamento +"'>O</spam></td>";
                cuerpo += "<td><spam class='eliminar' data-eliminar='"+resultado.rows.item(i).codigo_medicamento +"'>X</spam></td>";
                cuerpo += "</tr>";
            }
            
            $("#medicamentos").html(cabecera + cuerpo);
            $('.eliminar').click(function () {
                var confirmar = confirm("¿Desea eliminar?");
                if(confirmar == 1){
                    eliminar($(this).attr('data-eliminar'),base);
                    mostrar(base);
                }
            });

            $('.modificar').click(function () {
                

                console.log(mostrarCodigo($(this).attr('data-modificar'),base));
                $("#btnGuardar").css("display","none");
                $("#btnActualizar").css("display", "block");
                $("#btnCancelar").css("display", "block");
            });
        })
    })
}

function limpiar() {
    $("#codigo_medicamento").val(''),
    $("#nom_medicamento_comercial").val(''),
    $("#nom_medicamento_generico").val(''),
    $("#concentracion_medicamento").val(''),
    $("#nom_laboratorio").val(''),
    $("#presentacion_medicamento").val(''),
    $("#lote_medicamento").val(''),
    $("#fecha_medicamento").val(''),
    $("#conservacion_medicamento").val('')
};