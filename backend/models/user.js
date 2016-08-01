const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const opts = {
  discriminatorKey: 'role',
};

const UserSchema = new Schema({
  firstname: { type: String, default: '' },
  lastname: { type: String, default: '' },
  // name: { type: String, default: '' },
  email: { type: String, required: true, unique: true, index: true, default: '' },
  username: { type: String, default: '' },
  password: { type: String, required: true, default: '' },
  bio: { type: String, default: '' },
  salt: { type: String, default: '' },
  registerDate: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, index: true, default: '' },
  vcCreated: { type: Date },
  // courses: [{ type: ObjectId, ref: 'Course'}], // Duplicate with course.participants
  following: [{ type: ObjectId, ref: 'User' }],
  universities: [{ type: ObjectId, ref: 'University' }],
  programs: [{ type: ObjectId, ref: 'Program' }],
  avatarPath: { type: String, default: '' },
}, opts);

const StudentSchema = new Schema({
  // university: { type: ObjectId, ref: 'University' },
  // program: { type: ObjectId, ref: 'Program' },
}, opts);

const ProfSchema = new Schema({
}, opts);

// Indices

// Instance methods
UserSchema.methods.updatePassword = function (password) {
  return new Promise((resolve, reject) => {
    if (!password) return reject(Error('Password empty'));
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      this.salt = salt;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        this.password = hash;
        resolve();
      });
    });
  });
};

UserSchema.methods.authenticate = function (password) {
  return new Promise((resolve, reject) => {
    if (!this.verified) {
      return reject(Error('User not verified.'));
    }
    bcrypt.compare(password, this.password, (err, res) => {
      if (err) return reject(err);
      if (!res) return reject(Error('User/Password incorrect.'));
      return resolve(this);
    });
  });
};

UserSchema.methods.getCourseInstances = function (opts) {
  const CourseInstance = mongoose.model('CourseInstance');
  return new Promise((resolve, reject) => {
    var p;
    if (this.role === 'Student') {
      p = CourseInstance.find({ participants: { $in: [this.id] } });
    } else if (this.role === 'Prof') {
      p = CourseInstance.find({ prof: this.id });
    }
    if (typeof opts !== 'undefined') {
      if ('populate' in opts) {
        p = p.populate(opts.populate);
      }
      if ('select' in opts) {
        p = p.select(opts.select);
      }
      if ('lean' in opts) {
        p = p.lean(opts.lean);
      }
      if ('limit' in opts) {
        p = p.limit(opts.limit);
      }
    }
    p.exec().then(courseInstances => resolve(courseInstances))
            .catch(err => reject(err));
  });
};

UserSchema.methods.getQuestions = function (opts) {
  const Question = mongoose.model('Question');
  const getCourseInstanceIds = (courseInstance) => courseInstance._id;
  return new Promise((resolve, reject) => {
    this.getCourseInstances({
      select: 'id',
    }).then(function (courseInstances) {
      var p = Question.find({ courseInstance: { $in: courseInstances.map(getCourseInstanceIds) } });
      if (typeof opts !== 'undefined') {
        if ('populate' in opts) {
          p = p.populate(opts.populate);
        }
        if ('select' in opts) {
          p = p.select(opts.select);
        }
        if ('lean' in opts) {
          p = p.lean(opts.lean);
        }
        if ('limit' in opts) {
          p = p.limit(opts.limit);
        }
      }
      return p.exec();
    }).then(questions => resolve(questions))
      .catch(err => reject(err));
  });
};

UserSchema.methods.getFollowings = function (opts) {
  return new Promise((resolve, reject) => {
    var p = this.model('User').find({ _id: { $in: this.following } });
    if (typeof opts !== 'undefined') {
      if ('populate' in opts) {
        p = p.populate(opts.populate);
      }
      if ('select' in opts) {
        p = p.select(opts.select);
      }
      if ('lean' in opts) {
        p = p.lean(opts.lean);
      }
      if ('limit' in opts) {
        p = p.limit(opts.limit);
      }
    }
    p.exec().then(followings => resolve(followings))
            .catch(err => reject(err));
  });
};

UserSchema.methods.getAnswer = function (opts) {
  const Answer = mongoose.model('Answer');
  return new Promise((resolve, reject) => {
    var p = Answer.find({ user: this.id });
    if (typeof opts !== 'undefined') {
      if ('populate' in opts) {
        p = p.populate(opts.populate);
      }
      if ('select' in opts) {
        p = p.select(opts.select);
      }
      if ('lean' in opts) {
        p = p.lean(opts.lean);
      }
      if ('limit' in opts) {
        p = p.limit(opts.limit);
      }
    }
    p.exec().then(answers => resolve(answers))
            .catch(err => reject(err));
  });
};

UserSchema.methods.getComments = function (opts) {
  const Comment = mongoose.model('Comment');
  return new Promise((resolve, reject) => {
    var p = Comment.find({ user: this.id });
    if (typeof opts !== 'undefined') {
      if ('populate' in opts) {
        p = p.populate(opts.populate);
      }
      if ('select' in opts) {
        p = p.select(opts.select);
      }
      if ('lean' in opts) {
        p = p.lean(opts.lean);
      }
      if ('limit' in opts) {
        p = p.limit(opts.limit);
      }
    }
    p.exec().then(comments => resolve(comments))
            .catch(err => reject(err));
  });
};

UserSchema.methods.getFollowers = function (opts) {
  return new Promise((resolve, reject) => {
    var p = this.model('User').find({ following: { $in: [this._id] } });
    if (typeof opts !== 'undefined') {
      if ('populate' in opts) {
        p = p.populate(opts.populate);
      }
      if ('select' in opts) {
        p = p.select(opts.select);
      }
      if ('lean' in opts) {
        p = p.lean(opts.lean);
      }
      if ('limit' in opts) {
        p = p.limit(opts.limit);
      }
    }
    p.exec().then(followers => resolve(followers))
            .catch(err => reject(err));
  });
};

/* UserSchema.methods.getLikes = function (opts) {
  const Question = mongoose.model('Question');
  const Answer = mongoose.model('Answer');
  const Comment = mongoose.model('Comment');
  return new Promise((resolve, reject) => {
    var p = Q
  })
}*/

UserSchema.methods.getPkgs = function (opts) {
  const Pkg = mongoose.model('Pkg');
  return new Promise((resolve, reject) => {
    var p = Pkg.find({ owner: this._id });
    if (typeof opts !== 'undefined') {
      if ('populate' in opts) {
        p = p.populate(opts.populate);
      }
      if ('select' in opts) {
        p = p.select(opts.select);
      }
      if ('lean' in opts) {
        p = p.lean(opts.lean);
      }
      if ('limit' in opts) {
        p = p.limit(opts.limit);
      }
    }
    p.exec().then(Pkgs => resolve(Pkgs))
            .catch(err => reject(err));
  });
};

UserSchema.methods.getMaterials = function (opts) {
  const Material = mongoose.model('Material');
  const getPkgsIds = (Pkg) => Pkg._id;
  return new Promise((resolve, reject) => {
    this.getPkgs({
      select: 'id',
    }).then(function (pkgs) {
      var p = Material.find({ pkg: { $in: pkgs.map(getPkgsIds) } });
      if (typeof opts !== 'undefined') {
        if ('populate' in opts) {
          p = p.populate(opts.populate);
        }
        if ('select' in opts) {
          p = p.select(opts.select);
        }
        if ('lean' in opts) {
          p = p.lean(opts.lean);
        }
        if ('limit' in opts) {
          p = p.limit(opts.limit);
        }
      }
      return p.exec();
    }).then(materials => resolve(materials))
      .catch(err => reject(err));
  });
};

UserSchema.methods.getSuggestions = function (opts) {
  return new Promise((resolve, reject) => {
    this.model('User').find({ _id: { $in: this.following } })
    .select('id following').lean().exec().then(followings => {
      var followingsList = [];
      for (var i = 0; i < followings.length; i++) {
        if (followings[i].following.length > 0) followingsList = followingsList.concat(followings[i].following);
      }
      var p = this.model('User').find({ _id: { $in: followingsList } });
      if (typeof opts !== 'undefined') {
        if ('populate' in opts) {
          p = p.populate(opts.populate);
        }
        if ('select' in opts) {
          p = p.select(opts.select);
        }
        if ('lean' in opts) {
          p = p.lean(opts.lean);
        }
        if ('limit' in opts) {
          p = p.limit(opts.limit);
        }
      }
      p.exec().then(suggestions => resolve(suggestions))
              .catch(err => reject(err));
    });
  });
};

UserSchema.methods.getEvents = function (type, opts) {
  return new Promise((resolve, reject) => {
    var p;
    if (type === 'activities') {
      p = this.model('Event').find({ by: this._id });
    }
    else if (type === 'notifications') {
      p = this.model('Event').find({ to: { $in: [this._id] } });
    }
    p
      .select('id type to by createDate seen seenDate question answer')
      .populate([{
        path: 'by',
        select: 'firstname lastname',
      }, {
        path: 'question',
        select: 'id title',
      }, {
        path: 'answer',
        select: 'id content',
      }]);
    if (typeof opts !== 'undefined') {
      if ('lean' in opts) {
        p = p.lean(opts.lean);
      }
      if ('limit' in opts) {
        p = p.limit(opts.limit);
      }
    }
    p.exec().then(notifications => resolve(notifications))
            .catch(err => reject(err));
  });
};


// Virtuals

// Validations
UserSchema.path('email').validate(function (email) {
  return validator.isEmail(email);
}, 'Email is not valid.');

const User = mongoose.model('User', UserSchema);
const Student = User.discriminator('Student', StudentSchema);
const Prof = User.discriminator('Prof', ProfSchema);
