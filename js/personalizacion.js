document.getElementById('customization-form').addEventListener('submit', function(e){

  e.preventDefault();

  const nombre =
    document.getElementById('cust-name').value.trim();

  const telefono =
    document.getElementById('cust-phone').value.trim();

  const modelo =
    document.getElementById('cust-model').value.trim();

  const mensaje =
`Hola, soy ${nombre}.

Mi teléfono es ${telefono}.

Me gustaría realizar un pedido personalizado del modelo ${modelo}.

Quedo atento(a) a su información.

Gracias por su atención.`;

  const numeroWhatsapp = '573218067451'; // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje

  const url =
    `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;

    this.reset();

  window.open(url, '_blank');

});