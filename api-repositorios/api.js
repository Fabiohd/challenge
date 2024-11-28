const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const AVATAR_URL = 'https://avatars.githubusercontent.com/u/4369522?v=4';

app.get('/repositorios', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/orgs/takenet/repos');

        const repositoriosCSharp = response.data.filter(repo => repo.language === 'C#');

        repositoriosCSharp.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        const cincoMaisAntigos = repositoriosCSharp.slice(0, 5);

        const carrossel = cincoMaisAntigos.map(repo => ({
            imagem: AVATAR_URL,
            titulo: repo.full_name,
            subtitulo: repo.description,
        }));

        // Retorna os dados formatados
        res.json(carrossel);
    } catch (error) {
        console.error('Erro ao buscar os repositórios:', error.message);
        res.status(500).json({ error: 'Erro ao buscar os repositórios do GitHub.' });
    }
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}/repositorios`);
});
