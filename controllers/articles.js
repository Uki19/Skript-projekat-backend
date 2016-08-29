/**
 * Created by Uki on 8/29/16.
 */

var models = require('../models/');

var routes = {
    articles: '/articles',
    article: '/articles/:id'
}

function getArticles(req, res, next) {
    models.Article.findAll({
        include: [
            {
                model: models.Doctor,
                as: 'doctor'
            }
        ]
    })
        .then(function (articles) {
            res.status(200).json(articles);
        });
}

function getArticle(req, res, next) {
    models.Article.findById(req.params.id, {
        include: [
            {
                model: models.Doctor,
                as: 'doctor'
            }
        ]
    })
        .then(function (article) {
            res.status(200).json(article);
        })
}

function postArticle(req, res, next) {
    models.Article.create({
        title: req.body.name,
        content: req.body.description,
        doctorId: req.body.doctorId
    })
        .then(function (article) {
            res.status(201).json(article);
        });
}

module.exports.init = function (router) {
    router.get(routes.articles, getArticles);
    router.get(routes.article, getArticle);
    router.post(routes.articles, postArticle);
}