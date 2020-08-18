import React, { Component } from 'react';
import firebase from 'firebase';

const database = firebase.initializeApp({projectId: 'project-id'}).firestore();

export {database};