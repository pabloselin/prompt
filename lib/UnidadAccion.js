'use strict'

const Archetype = require('archetype-js')

module.exports = new Archetype({
  id: {
    $type: 'string'
  },
  ids_asoc: {
    $type: 'string',
  },
  texto: {
    $type: 'string',
    $required: true
  },
  tipo: {
    $type: 'string',
    $required: true
  },
  personajes: {
    $type: 'string'
  },
  seccion: {
    $type: 'string',
    $required: true
  },

}).compile('UnidadAccion')
