module.exports = (router) => {
  router.get('/', function *(){
  	yield this.render('index');
  });
  
  router.get('*', function *(){
  	yield this.render('index');
  });
};