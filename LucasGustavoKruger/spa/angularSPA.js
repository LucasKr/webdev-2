var app = angular.module('angularSPA', ['ui.router']);

app.controller('mainController', function($scope, $state, manterUsuariosServico) {
  $scope.titulo = "Usuários";

  $scope.usuarios = manterUsuariosServico.fetchUsuarios();

  $scope.adicionarUsuario = function() {
    $state.go('novoUsuario');
  }
});

app.controller('novoUsuarioController', function($scope, $state, manterUsuariosServico) {

  $scope.limparCampos = () => {
    $scope.novoUsuario = {}
  }

  $scope.salvarNovoUsuario = (usuario) => {
    manterUsuariosServico.adicionaUsuario(usuario);
    $state.go('listaUsuarios');
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

app.service('manterUsuariosServico', function() {
  var actualID = 0;
  var usuarios = [];

  return {
    adicionaUsuario: function(novoUsuario) {
      novoUsuario._id = ++actualID;
      usuarios.push(novoUsuario);
    },

    fetchUsuarios: function() {
      return usuarios;
    }

  }

});