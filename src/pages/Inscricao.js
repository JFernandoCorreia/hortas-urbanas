/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Supondo que axios seja usado para a API

const Inscricao = () => {
  const [userData, setUserData] = useState(null); // Adicionando o estado para armazenar os dados do usuário
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      nome: '',
      endereço: '',
      complemento: '',
      cep: '',
      bairro: '',
      diasFuncionamento: '',
      telefone: '',
      email: '',
      descricao: '',
      documentos: null,
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome é obrigatório'),
      descricao: Yup.string().required('Descrição é obrigatória'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // Simulando a resposta da API e setando os dados do usuário após o cadastro
      try {
        const response = await axios.post('/api/users/register', values);
        setUserData(response.data); // Armazena os dados do usuário após o cadastro
        setSuccessMessage('Cadastro realizado com sucesso!');
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        setErrorMessage('Erro ao cadastrar. Por favor, tente novamente.');
      }
    },
  });

  const handleCepChange = async (event) => {
    const cep = event.target.value.replace(/\D/g, '');
    formik.setFieldValue('cep', cep);

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        if (!data.erro) {
          formik.setValues({
            ...formik.values,
            endereco: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
          });
        } else {
          setErrorMessage("CEP inválido");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: "url('/images/flores.png')" }}>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md bg-transparent p-8 rounded-lg shadow-lg space-y-4">
        <label htmlFor="nome" className="block mb-2 text-recifeWhite">Nome Completo</label>
        <input
          type="text"
          name="nome"
          value={formik.values.nome}
          onChange={formik.handleChange}
          placeholder="Nome Completo"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="email" className="block mb-2 text-recifeWhite">E-mail</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Email"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="cpf" className="block mb-2 text-recifeWhite">CPF</label>
        <input
          type="text"
          name="cpf"
          value={formik.values.cpf}
          onChange={formik.handleChange}
          placeholder="CPF"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="cep" className="block mb-2 text-recifeWhite">CEP</label>
        <input
          type="text"
          name="cep"
          value={formik.values.cep}
          onChange={handleCepChange}
          placeholder="CEP"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="endereco" className="block mb-2 text-recifeWhite">Logradouro</label>
        <input
          type="text"
          name="endereco"
          value={formik.values.endereco}
          onChange={formik.handleChange}
          placeholder="Endereço"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="bairro" className="block mb-2 text-recifeWhite">Bairro</label>
        <input
          type="text"
          name="bairro"
          value={formik.values.bairro}
          onChange={formik.handleChange}
          placeholder="Bairro"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="diasFuncionamento" className="block mb-2 text-recifeWhite">Dias de Funcionamento</label>
        <input
          type="text"
          name="diasFuncionamento"
          value={formik.values.diasFuncionamento}
          onChange={formik.handleChange}
          placeholder="Dias de Funcionamento"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="telefone" className="block mb-2 text-recifeWhite">Telefone</label>
        <input
          type="text"
          name="telefone"
          value={formik.values.telefone}
          onChange={formik.handleChange}
          placeholder="Telefone"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <label htmlFor="descricao" className="block mb-2 text-recifeWhite">Descrição</label>
        <textarea
          name="descricao"
          value={formik.values.descricao}
          onChange={formik.handleChange}
          placeholder="Descrição da Horta"
          className="block w-full p-2 border rounded text-black"
          required
        />

        <button type="submit" className="bg-recifeBlue text-recifeWhite px-4 py-2 m-0 rounded-lg hover:bg-recifeGold hover:text-recifeBlue w-full">
          Enviar Inscrição
        </button>
      </form>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Inscricao;
