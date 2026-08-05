export default async function handler(req, res) {
    return res.status(200).json({
        ok: true,
        message: "API funcionando!"
    });
}
await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "arthurmartins2325@icloud.com",
  subject: "Novo pedido",
  html: "<h1>Pedido recebido</h1>"
});