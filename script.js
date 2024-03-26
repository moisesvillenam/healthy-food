function mostrarCalculadora() {
    // Ocultar la bienvenida
    document.getElementById("welcome").style.display = "none";
    // Mostrar la calculadora
    document.getElementById("calculator").style.display = "block";
}

function calcularIMC() {
    var peso = parseFloat(document.getElementById("weight").value);
    var altura = parseFloat(document.getElementById("height").value);
    var edad = parseFloat(document.getElementById("age").value);
    if (!isNaN(edad) && !isNaN(peso) && !isNaN(altura) && altura > 0 && peso > 0 && edad > 12) {
        var imc = peso / (altura * altura);
        var resultado = "Su IMC es: " + imc.toFixed(2);

        if (imc < 18.5) {
            resultado += " (Bajo peso)";
        } else if (imc < 24.9) {
            resultado += " (Peso normal)";
        } else if (imc < 29.9) {
            resultado += " (Sobrepeso)";
        } else {
            resultado += " (Obesidad)";
        }

        var idealWeight = 22.5 * altura * altura;
        var calories = calcularCalorias(idealWeight, edad, imc);

        document.getElementById("result").innerText = resultado;
        document.getElementById("idealWeight").innerText = "Su peso ideal es: " + idealWeight.toFixed(2) + " kg";
        document.getElementById("calories").innerText = "Calorías recomendadas: " + calories.toFixed(2) + " kcal";
        document.getElementById("showMenuButton").style.display = "block";
    } else {
        alert("Por favor, ingrese valores válidos para peso, edad y altura.");
    }
    document.getElementById("nav").classList.add("posicion-relativa");
}
function calcularCalorias(peso, edad, imc) {
    if (edad < 18){
        var calorias = (15.535*peso)+675.2;
    }else if (edad<30){
        var calorias = (14.9375*peso)+589.40;
    }else if (edad < 60){
        var calorias = (9.799*peso)+859.35;
    }else{
        var calorias = (10.3965*peso)+623.1;
    }
    var calorias1 = calorias*1.5;
    if (imc < 18.5){
        var caloriasFinal = calorias1+500;
    }else if (imc < 24.9){
        var caloriasFinal = calorias1;
    }else if (imc < 29.9){
        var caloriasFinal = (calorias1-400);
    }else{
        var caloriasFinal = (calorias1-550);
    }
    return caloriasFinal;
}

// Función para cargar el menú desde el archivo JSON
function cargarMenu() {
        // Cerrar la calculadora al abrir el menú
        document.getElementById("calculator").style.display = "none";

        // Código para cargar el menú desde el archivo JSON
        fetch('menu.json')
            .then(response => response.json())
            .then(data => {
                mostrarMenu(data.platos);
                document.getElementById("menu").style.display = "block";
                document.getElementById("showMenuButton").style.display = "none";
            })
            .catch(error => console.error('Error al cargar el menú:', error));
    }

function mostrarMenu(platos) {
    var menuContainer = document.getElementById('menu');
    var sugerenciaCalorias = document.getElementById('calories').innerText;
    sugerenciaCalorias = parseFloat(sugerenciaCalorias.split(' ')[2]);

    // Filtrar platos que tengan menos o igual cantidad de calorías que la tercera parte de la sugerencia
    var platosFiltrados = platos.filter(plato => plato.calorias <= sugerenciaCalorias * 0.30);
    var platosFinal = platosFiltrados.sort(function() { return Math.random() - 0.5 });
    // Mostrar máximo 5 platos
    //var platosAMostrar = platosFinal.slice(0, 5);
    var listadeplatos = []
    platosFinal.forEach(plato => {
        listadeplatos.push(plato.nombre)
        var dishDiv = document.createElement('div');
        dishDiv.className = 'dish';
        var img = document.createElement('img');
        img.src = plato.imagen;
        img.alt = plato.nombre;

        var nombre = document.createElement('h3');
        nombre.innerText = plato.nombre;

        var precio = document.createElement('p');
        precio.innerText = 'Precio: $' + plato.precio.toFixed(2);

        var calorias = document.createElement('p');
        calorias.innerText = 'Calorías: ' + plato.calorias + ' kcal';

        var descripcion = document.createElement('p');
        descripcion.innerText = plato.description;
        // Botón para cada plato
        var botonPlato = document.createElement('button');
        botonPlato.innerText = 'Ordenar';
        botonPlato.onclick = function() {
            // Redireccionar al enlace del plato
            window.location.href = plato.enlace;
        };

        dishDiv.appendChild(img);
        dishDiv.appendChild(nombre);
        dishDiv.appendChild(precio);
        dishDiv.appendChild(calorias);
        dishDiv.appendChild(descripcion);
        dishDiv.appendChild(botonPlato);

        menuContainer.appendChild(dishDiv);
    });
    var botonAdicional = document.getElementById("botonAdicional");
    botonAdicional.style.display = "block";
    botonAdicional.addEventListener("click", function() {
        window.location.href = "https://api.whatsapp.com/send?phone=593959217004&text=Hola%2C%20Deseo%20Ordenar%20el%20Men%C3%BA%20semanal%2C%20mis%20platos%20son%3A%0A"+listadeplatos[0]+"%2C%0A"+listadeplatos[1]+"%2C%0A"+listadeplatos[2]+"%2C%0A"+listadeplatos[3]+"%2C%0A"+listadeplatos[4];
    });
};

window.onload = function() {

};
var executeCheckEnter = true;
function checkEnter(event) {
    if (event.key === "Enter" && executeCheckEnter) {
        calcularIMC();
    }
}
function clearEnterEvent() {
    executeCheckEnter = true;
} 
