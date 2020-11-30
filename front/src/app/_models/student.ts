/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

export class Student {
    id: number
    name: string;
    email: string;
    phones: Array<string>;
    cpf: string;
    rg: string;
    birthdate: string;
    registration: string;
    evaluations: Array<string>;
}