import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { orderId, total, items, customer } = req.body;

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "syntheticgrin01@gmail.com",
            subject: `🛒 Novo Pedido #${orderId}`,
            html: `
                <h2>Novo Pedido</h2>

                <p><b>Cliente:</b> ${customer}</p>

                <p><b>Pedido:</b> #${orderId}</p>

                <p><b>Total:</b> R$ ${total}</p>

                <h3>Produtos</h3>

                <pre>${items}</pre>
            `
        });

        res.status(200).json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}