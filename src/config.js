'use strict';

var WEBFUCK_CHECK_LIST = [
    'robots.txt',
    'crossdomain.xml',
    'sitemap.xml',
    'index.pyc',
    'app.pyc',
    '__init__.pyc',
    'flag',
    'flag.txt',
    'backup.zip',
    'backup.tar',
    'backup.gz',
    'backup.tar.gz',
    'backup.bz2',
    'backup.tar.bz2',
    'dump.sql',
    'dump.gz',
    'dump.sql.gz',
    'dump.zip',
    '.svn/',
    '.git/',
    '.hg/',
    'admin/'
];

var WEBFUCK_CHECK_LIST_EXT = [
    '.{filename}.swp',
    '.{filename}.swo',
    '.{filename}.swn',
    '{filename}~',
    '.{filename}~',
    '{filename}.bak',
    '.{filename}.bak',
    '{filename}.old',
    '.{filename}.old',
    '{filename}c'
];

var WEBFUCK_CHECK_WAIT = 1000;
