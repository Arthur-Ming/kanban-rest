const schemaOptions = () => ({
  versionKey: false,
  id: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.passwordHash;
      delete ret.salt;
    },
  },
});

export default schemaOptions;
