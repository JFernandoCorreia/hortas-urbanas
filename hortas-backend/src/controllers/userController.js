const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validateUser } = require("../utils/validation");

exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Validação dos dados
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Este email já está cadastrado. Tente outro ou recupere a senha." });
    } 

     // Hash da senha antes de salvar no banco
     const hashedPassword = await bcrypt.hash(senha, 10);

     const novoUsuario = await User.create({
       nome,
       email,
       senha: hashedPassword,
     });

     res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
    } catch (error) {
      res.status(500).json({ message: "Erro ao cadastrar usuário", error });
    }
};

exports.approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.approveUser(id);

    if (!updated) return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json({ message: "Usuário aprovado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Email ou senha incorretos" });

    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ message: "Email ou senha incorretos" });

    // Cria o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

