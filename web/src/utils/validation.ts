export const requiredRule = (value: string) => {
  if (!value) {
    return "Campo obrigatório";
  }
};

export const emailRule = (value: string) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(value)) {
    return "E-mail inválido";
  }
};

export const passwordRule = (value: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!passwordRegex.test(value)) {
    return "Senha muito fraca, utilize pelo menos 6 caracteres com letras maiúscula , minúscula e números";
  }
};
