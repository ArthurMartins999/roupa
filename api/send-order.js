export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Somente POST permitido"
    });
  }


  console.log("Recebi:", req.body);


  return res.status(200).json({
    ok: true,
    mensagem: "Pedido recebido pela API!",
    dados: req.body
  });

}