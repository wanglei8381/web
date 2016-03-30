var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*//学生模型
 var StudentSchema = new Schema({
 sid: {type: String},//学号
 password: {type: String},
 name: {type: String},
 sex: {type: Number},//0：男，1：女
 enterTime: {type: String},//入学时间
 classId: {type: String}//所在班级编号
 });

 StudentSchema.index({sid: 1}, {unique: true});
 mongoose.model('Student', StudentSchema);

 //教师表
 var TeacherSchema = new Schema({
 tid: {type: String},//教师号
 password: {type: String},
 name: {type: String},
 isHead: {type: Number, default: 0},//班主任标识0不是，1是
 isSupervisor: {type: Number, default: 0}//辅导员标识,0不是，1是
 });

 TeacherSchema.index({tid: 1}, {unique: true});
 mongoose.model('Teacher', TeacherSchema);*/

//用户表
var UserSchema = new Schema({
    identity: {type: Number, default: 1},//学生1，老师(班主任2辅导员3普通老师4)
    stid: {type: String},//学号或工号
    password: {type: String, default: 111111},//默认密码111111
    name: {type: String},
    classId: {type: String},//所在班级编号
    collegeId: {type: String}//所在院系编号
});
UserSchema.index({stid: 1}, {unique: true});
mongoose.model('User', UserSchema);

//班级表
var ClassSchema = new Schema({
    name: {type: String},
    collegeId: {type: String},//所在院系编号
    head_teacher: {type: String},//班主任标识id工号
    supervisor: {type: String}//辅导员id工号
});
mongoose.model('Class', ClassSchema);

//新闻表
var NewsSchema = new Schema({
    userId: {type: String},
    title: {type: String},
    imgUrl: {type: String},
    description: {type: String},
    content: {type: String},
    scope: {type: Number, default: 0},//0公开1限定学院
    collegeIds: {type: Array},
    status: {type: Number, default: 0},//0未发布1已发布、2关闭
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
mongoose.model('News', NewsSchema);


//通知表
var NotificationSchema = new Schema({
    userId: {type: String},
    title: {type: String},
    description: {type: String},
    content: {type: String},
    collegeId: {type: String},//所属院系编号
    status: {type: Number, default: 0},//0未发布1已发布、2关闭
    type: {type: Number, default: 0},//通知类型
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
mongoose.model('Notification', NotificationSchema);


//职位表
var JobSchema = new Schema({
    companyName: {type: String},
    workPlace: {type: String},
    jobName: {type: String},
    jobDescription: {type: String},
    userId: {type: String},
    collegeId: {type: String},//所属院系编号(职位发布来源)
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
mongoose.model('Job', JobSchema);


//资源表
var ResourceSchema = new Schema({
    name: {type: String},
    description: {type: String},
    url: {type: String},
    userId: {type: String},
    collegeId: {type: String},//所属院系编号
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
mongoose.model('Resource', ResourceSchema);

//假条表
var NoteSchema = new Schema({
    reason: {type: String},
    days: {type: Number},
    beginDate: {type: String},
    endDate: {type: String},
    approver: {type: String},//审批人ID
    status: {type: Number, default: 2},//0未通过，1通过，2审批中
    rejectReason: {type: String},
    userId: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
mongoose.model('Note', NoteSchema);