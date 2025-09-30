// Mock do "servidor": aceita QUALQUER email, desde que a senha seja "1234".
export function autenticar({ email, senha }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (senha === "1234") {
        resolve({
          ok: true,
          user: { email },
          token: "fake-token-123",
        });
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 400);
  });
}