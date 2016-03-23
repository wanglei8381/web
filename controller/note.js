/**
 * message controller
 * @param req
 * @param res
 * @param next
 */
var note = module.exports = function (req, res, next) {
    console.log('进入message controller...');
    next();
};

note.mynoteList = function (req, res) {
    res.render('note', {menus_index: 4,note_type: 0});
};

note.noteAdd = function (req, res) {
    res.render('noteAdd', {menus_index: 4});
};

note.noteList = function (req, res) {
    res.render('note', {menus_index: 4,note_type: 1});
};

note.noteDetail = function(req, res) {
    res.render('noteDetail', {menus_index: 4,note_type: 0});
}

note.noteApproval = function(req, res) {
    res.render('noteApproval', {menus_index: 4,note_type: 1});
}