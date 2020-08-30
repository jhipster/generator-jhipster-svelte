import sirv from 'sirv'
import polka from 'polka'
import { createProxyMiddleware } from 'http-proxy-middleware'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('src/main/webapp/static', { dev }),
		sapper.middleware()
	)
	.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:8080',
			changeOrigin: true,
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err)
	})
