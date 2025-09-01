export type User = {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  valor_carteira: number;
  endereco?: string;
  data_nascimento?: string;
  data_abertura?: string;
  endereco_carteira?: string;
};

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

