import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  // Permite apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido"
    });
  }

  try {

    const { orderId, total, items, customer } = req.body;


    // Verifica se recebeu os dados
    if (!customer || !items) {
      return res.status(400).json({
        error: "Dados incompletos"
      });
    }


    // Monta a lista dos produtos
    const produtos = items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>R$ ${item.price}</td>
      </tr>
    `).join("");


    // Envia o email
    const email = await resend.emails.send({

      from: "onboarding@resend.dev",

      to: "SEU_EMAIL_AQUI@gmail.com",

      subject: `Novo pedido #${orderId}`,

      html: `
        <h1>Novo pedido recebido 🚀</h1>

        <h2>Cliente</h2>

        <p>
          Nome: ${customer.name}<br>
          Email: ${customer.email}
        </p>


        <h2>Produtos</h2>

        <table border="1" cellpadding="10">
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
          </tr>

          ${produtos}

        </table>


        <h2>Total</h2>

        <h3>R$ ${total}</h3>

      `
    });


    return res.status(200).json({
      ok: true,
      message: "Pedido enviado com sucesso!",
      id: email.data?.id
    });


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Erro ao enviar email",
      details: error.message
    });

  }

}