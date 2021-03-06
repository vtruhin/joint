'use strict';

QUnit.module('cellView', function(hooks) {

    var cellView;

    hooks.beforeEach(function() {

        // !! TODO !!
        // Should be able to create a CellView instance without the graph or paper.

        var paper = new joint.dia.Paper({
            model: new joint.dia.Graph
        });

        var cell = new joint.shapes.basic.Rect;

        paper.model.addCell(cell);
        cellView = paper.findViewByModel(cell);
    });

    QUnit.module('can(feature)', function(hooks) {

        QUnit.test('should be a function', function(assert) {

            assert.equal(typeof joint.dia.CellView.prototype.can, 'function');
        });

        QUnit.test('options.interactive = false', function(assert) {

            cellView.options.interactive = false;

            assert.notOk(cellView.can('someFeature'));
        });

        QUnit.test('options.interactive = true', function(assert) {

            cellView.options.interactive = true;

            assert.ok(cellView.can('someFeature'));
        });

        QUnit.test('options.interactive = { someFeature: false }', function(assert) {

            cellView.options.interactive = { someFeature: false };

            assert.notOk(cellView.can('someFeature'));
        });

        QUnit.test('options.interactive = { someFeature: true }', function(assert) {

            cellView.options.interactive = { someFeature: true };

            assert.ok(cellView.can('someFeature'));
        });

        QUnit.test('options.interactive = function(cellView) { }', function(assert) {

            var called = false;

            cellView.options.interactive = function(cellView) {

                called = true;
                return false;
            };

            assert.notOk(cellView.can('someFeature'));
            assert.ok(called);
        });
    });
});
