export default {
  title: 'About',
  setting: {
    language: {
      label: 'Language',
    },
  },
  project: {
    purpose: {
      caption: 'Purpose',
      label: 'This project aims to provide a simple and easy-to-use interface for users to access the bus arrival time data.'
    },
    about: {
      caption: 'About',
      label: 'This is an open source project. You can find the source code on GitHub.'
    },
    version: {
      caption: 'Version',
      label: '1.0.0'
    },
    dataSource: {
      caption: 'Source of the Data',
      label: 'DATA.GOV.HK',
    },
    dataOwnership: {
      caption: 'Ownership of the Data',
      label: 'The data is owned by the Government of HKSAR.',
    },
    createdBy: {
      caption: 'Created By',
      // https://vue-i18n.intlify.dev/guide/essentials/syntax.html#interpolations
      label: "{account}{'@'}{domain}",
    },
    suggestionsOrBugReport: {
      caption: 'Suggestions or Bug Report',
      label: "{account}{'@'}{domain}",
    },
  }
}
