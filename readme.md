# Bicycle Blog Engine

**This is my bicycle and it should be wordpress like project.**

Stack: Node.js, Express, Pug (server-side rendering), Sequelize (MySQL dialect).  

This is an **experimental project**, I don't advise using it on production. It **hasn't finished yet**. 

- The main template is clumsily copied from Twenty-Sixteen theme of Wordpress (**ughh.. my html&css skills**)
- The admin template is [Carbon](http://carbon.smartisan.io/)
- WYSIWYG redactor - [CKeditor](https://ckeditor.com/) 

## install
first of all you need to configure your `config.json` then:
```bash
npm install
npm start
```
in another console
```bash
npm run seed
```

1. then go to your http://yourhost:yourport/admin/login
2. create your first category. write your first post, choose your category that you created, write your tags.
4. and you can create your pages
5. add to menu your pages (_not realized yet_)
6. .... (_not yet implemented functionals_)

## TODO
- [x] front-end template
- [x] admin front-end template
- [x] admin auth
- [x] article routing/controllers/views
- [x] tag routing/controllers/views
- [x] category routing/controller/views
- [x] page routing middleware
- [x] page controller/views
- [x] to bring order to routes
- [ ] custom settings
- [ ] settings -> menu
- [ ] settings -> custom permalinks [_for this functionality need to change logic of project_]
- [ ] register invite functionality
- [ ] commentary controllers/views
- [ ] Add validators where the verbs POST, PUT, DELETE are used
- [ ] to bring order to templates
- [ ] to bring order to duplicate controllers
- [ ] fix front-end part
- [ ] mailing
- [x] use morgan logger in development
- [ ] use winston logger in production
- [ ] add tests!!1
