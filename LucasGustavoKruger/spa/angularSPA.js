var app = angular.module('angularSPA', ['ui.router']);

app.controller('mainController', function($scope, $state, manterUsuariosServico) {
  $scope.titulo = "Usuários";

  $scope.adicionarUsuario = function() {
    $state.go('novoUsuario');
  }

  function fetchUsers() {    
    manterUsuariosServico.fetchUsuarios()
      .then((users) => {
        $scope.usuarios = users;
      });
  }

  fetchUsers();
});

app.controller('novoUsuarioController', function($scope, $state, manterUsuariosServico) {

  $scope.limparCampos = () => {
    $scope.novoUsuario = {}
  }

  $scope.salvarNovoUsuario = (usuario) => {
    manterUsuariosServico.adicionaUsuario(usuario).then(() => {
      $state.go('listaUsuarios');
    });
  };

});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/error');

  let novoUsuarioState = {
    name: 'novoUsuario',
    url: '/novoUsuario',
    templateUrl: 'novoUsuario.html',
    controller: 'novoUsuarioController',
  }

  let listaUsuariosState = {
    name: 'listaUsuarios',
    url: '/',
    templateUrl: 'listaUsuarios.html',
    controller: 'mainController'
  }

  let errorState = {
    name: 'error',
    url: '/error',
    templateUrl: 'error.html'
  }

  $stateProvider.state(novoUsuarioState);
  $stateProvider.state(listaUsuariosState);
  $stateProvider.state(errorState);
});

app.service('manterUsuariosServico', function($q) {
  var actualID = 0;
  var usuarios = [];

  return {
    adicionaUsuario: function(novoUsuario) {
      var deferred = $q.defer();

      deferred.resolve(function() {
        novoUsuario._id = ++actualID;
        usuarios.push(novoUsuario);
      });
      
      return deferred.promise;
    },

    fetchUsuarios: function() {
      var deferred = $q.defer();
      deferred.resolve(usuarios);
      return deferred.promise;
    }

  }

});