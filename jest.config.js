module.exports = {
	roots: ['<rootDir>/src'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+.tsx?$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.jest.json',
		},
	},

	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/test/__mocks__/fileMock.ts',
		'.(css|less|scss)$': '<rootDir>/test/__mocks__/styleMock.ts',
		'.module.css$': 'identity-obj-proxy',
	},
}
