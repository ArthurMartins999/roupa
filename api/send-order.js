const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Método não permitido"
      });
    }


    const { orderId, total, items, customer } = req.body;


    if (!customer || !items) {
      return res.status(400).json({
        error: "Dados faltando"
      });
    }


    const produtos = items.map(item => `
      <p>
        ${item.name} - Quantidade: ${item.quantity}
      </p>
    `).join("");


    const email = await resend.emails.send({

      from: "onboarding@resend.dev",

      to: "SEU_EMAIL@gmail.com",

      subject: "Novo pedido recebido",

      html: `
        <h1>Novo pedido</h1>

        <p>ID: ${orderId}</p>

        <h2>Cliente</h2>
        <p>
        ${customer.name}<br>
        ${customer.email}
        </p>

        <h2>Produtos</h2>

        ${produtos}

        <h2>Total</h2>

        R$ ${total}
      `
    });


    return res.status(200).json({
      ok: true,
      email
    });


  } catch(error){

    console.log(error);

    return res.status(500).json({
      erro: error.message
    });

  }

};