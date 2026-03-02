import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  ProjetoObra: a
    .model({
      nomeProjeto: a.string().required(),
      secretariaExecutora: a.string().required(),
      numeroContrato: a.string().required(),
      valorContrato: a.float().required(),
      dataContrato: a.date().required()
    })
    .authorization((allow) => [allow.authenticated()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool"
  }
});
