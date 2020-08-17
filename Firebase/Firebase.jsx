import React, { Component } from 'react';
import firebase from 'firebase';

const database = firebase.initializeApp({projectId: 'web-react-cloud'}).firestore();

export {database};