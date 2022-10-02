import path from "node:path";
import url from "node:url";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
export default {
  entry: glob.sync("./src/**/*.js"),
  // Entry    : "/src/main/script.js",
  mode: "development",
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Test",
      templateContent: `
	<!DOCTYPE html>
    <html>
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/ysp2yzy.css">
		    <link rel="stylesheet" href="https://meyerweb.com/eric/tools/css/reset/reset.css">
				<script src="//code.iconify.design/1/1.0.6/iconify.min.js" defer></script>
				<meta name="viewport" content="width=device-width, initial-scale=1">
			</head>
      <body>
				<div id="content"></div>
      </body>
    </html>
  `,
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif|webp)$/i,
        type: "asset",
      },
      // compress images
      {
        test: /\.(png|svg|jpg|jpeg|gif|jfif|webp)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            // enforce: "pre",
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                  plugins: [
                    "imagemin-gifsicle",
                    "imagemin-mozjpeg",
                    "imagemin-pngquant",
                    "imagemin-svgo",
                  ],
                },
              },
            },
          },
        ],
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  devServer: {
    compress: true,
  },
};
