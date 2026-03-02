"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

type FormState = {
  nomeProjeto: string;
  secretariaExecutora: string;
  numeroContrato: string;
  valorContrato: string;
  dataContrato: string;
};

const initialForm: FormState = {
  nomeProjeto: "",
  secretariaExecutora: "",
  numeroContrato: "",
  valorContrato: "",
  dataContrato: ""
};

export default function ProjectManager() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Schema["ProjetoObra"]["type"][]>([]);

  useEffect(() => {
    const subscription = client.models.ProjetoObra.observeQuery().subscribe({
      next: ({ items }) => setProjects(items)
    });

    return () => subscription.unsubscribe();
  }, []);

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.nomeProjeto.localeCompare(b.nomeProjeto)),
    [projects]
  );

  const createProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await client.models.ProjetoObra.create({
        nomeProjeto: form.nomeProjeto,
        secretariaExecutora: form.secretariaExecutora,
        numeroContrato: form.numeroContrato,
        valorContrato: Number(form.valorContrato),
        dataContrato: form.dataContrato
      });

      setForm(initialForm);
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (id: string) => {
    await client.models.ProjetoObra.delete({ id });
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Gestão de Obras de Infraestrutura</h1>
        <p>Cadastre e acompanhe projetos de obras com autenticação real no Amplify.</p>
      </div>

      <form className="card" onSubmit={createProject}>
        <h2>Novo projeto</h2>
        <div className="grid">
          <input
            required
            placeholder="Nome do projeto"
            value={form.nomeProjeto}
            onChange={(e) => setForm({ ...form, nomeProjeto: e.target.value })}
          />
          <input
            required
            placeholder="Secretaria executora"
            value={form.secretariaExecutora}
            onChange={(e) => setForm({ ...form, secretariaExecutora: e.target.value })}
          />
          <input
            required
            placeholder="Número do contrato"
            value={form.numeroContrato}
            onChange={(e) => setForm({ ...form, numeroContrato: e.target.value })}
          />
          <input
            required
            type="number"
            min="0"
            step="0.01"
            placeholder="Valor do contrato"
            value={form.valorContrato}
            onChange={(e) => setForm({ ...form, valorContrato: e.target.value })}
          />
          <input
            required
            type="date"
            value={form.dataContrato}
            onChange={(e) => setForm({ ...form, dataContrato: e.target.value })}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar projeto"}
          </button>
        </div>
      </form>

      <div className="card">
        <h2>Projetos cadastrados</h2>
        <table>
          <thead>
            <tr>
              <th>Projeto</th>
              <th>Secretaria</th>
              <th>Contrato</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.nomeProjeto}</td>
                <td>{project.secretariaExecutora}</td>
                <td>{project.numeroContrato}</td>
                <td>
                  {project.valorContrato.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </td>
                <td>{new Date(project.dataContrato).toLocaleDateString("pt-BR")}</td>
                <td>
                  <button className="secondary" onClick={() => removeProject(project.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
