module.exports = {
  testURL: "http://localhost/",
  collectCoverage: true,
  collectCoverageFrom: ["frontend/src/**/*.(ts|tsx)", "!frontend/**/*.d.ts", "!frontend/src/index.tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  testMatch: ["**/frontend/src/**/*.test.(ts|tsx)"],
  setupFilesAfterEnv: ["<rootDir>/frontend/setupTest.ts"]
}
