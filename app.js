
var image = document.getElementById('image');
var input = document.getElementById('image-input');
var download = document.getElementById('download');
var previews = document.getElementById('previews');
var previewsList = document.querySelector(".prev-list")
var cropper;
var position;
var files;
var gallery;
var imageCount;


function cropAndDownloadImage(file, pos) {

    let { x, y, width, height } = pos;
    var reader = new FileReader();

    reader.onload = function (e) {
        // 创建一个新的 Image 对象
        var image = new Image();
        image.onload = function () {
            // 创建一个 canvas 元素
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // 设置 canvas 的宽度和高度为裁剪区域的大小
            canvas.width = width;
            canvas.height = height;

            // 将图片绘制到 canvas 上，并且只显示裁剪的部分
            ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

            // 将 canvas 转换为DataURL（base64格式的图片）
            var dataURL = canvas.toDataURL('image/png');

            // 创建一个下载链接
            var link = document.createElement('a');
            link.href = dataURL;
            // 使用上传文件的名称作为下载文件的名称
            link.download = file.name;

            // 模拟点击下载
            document.body.appendChild(link);
            link.click();

            // 清理
            document.body.removeChild(link);
            canvas = null;
        };
        // 设置图片的 src 属性来加载图片
        image.src = e.target.result;
    };
    // 读取文件
    reader.readAsDataURL(file);
}


function base64ToBlobUrl(base64) {
    const type = 'image/png';

    // 解码Base64字符串，去掉前缀（例如：data:image/png;base64,）
    const byteString = atob(base64.split(',')[1]);

    // 创建一个8位无符号整型数组，用于存储二进制数据
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ab[i] = byteString.charCodeAt(i);
    }

    // 创建Blob对象
    const blob = new Blob([ab], { type: mimeString });

    // 创建Blob URL
    return URL.createObjectURL(blob);
}

function previewImage(file, pos, cb) {

    let { x, y, width, height } = pos;
    var reader = new FileReader();

    reader.onload = function (e) {
        // 创建一个新的 Image 对象
        var image = new Image();
        image.onload = function () {
            // 创建一个 canvas 元素
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // 设置 canvas 的宽度和高度为裁剪区域的大小
            canvas.width = width;
            canvas.height = height;

            // 将图片绘制到 canvas 上，并且只显示裁剪的部分
            ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
            // 将 canvas 转换为DataURL（base64格式的图片）
            var dataURL = base64ToBlobUrl(canvas.toDataURL('image/png'));

            console.log(dataURL);
            var img = document.createElement('img');
            img.src = dataURL;
            img.style.margin = '10px';
            img.style.border = '1px solid #ccc';
            img.width = 300;
            var li = document.createElement('li');
            li.appendChild(img);
            previewsList.appendChild(li);


            cb && cb();

        };
        // 设置图片的 src 属性来加载图片
        image.src = e.target.result;
    };
    // 读取文件
    reader.readAsDataURL(file);
}




// 使用函数
// cropAndDownloadImage('path/to/your/image.jpg', 50, 50, 200, 200);


document.getElementById('image-input').addEventListener('change', function (e) {
    files = e.target.files;
    console.log(files);
    var done = function (url) {
        // input.value = '';
        image.src = url;
        cropper = new Cropper(image, {
            autoCrop: false,
            scalable: false,
            zoomable: false,
            zoomOnTouch: false,
            zoomOnWheel: false,
            center: false,
            guides: false,
            restore: false,
            background: false,
            crop: function (event) {
                position = {
                    x: event.detail.x,
                    y: event.detail.y,
                    width: event.detail.width,
                    height: event.detail.height
                }
                // console.log(position);
            }
        });
    };

    if (files && files.length > 0) {
        var reader = new FileReader();
        reader.onload = function (e) {
            done(reader.result);
        };
        reader.readAsDataURL(files[0]);
    }
});



previews.onclick = function () {
    previewsList.innerHTML = '';
    if (!position) {
        alert("请先框选剪裁区域")
        return;
    }
    let cur = 0;

    for (let index = 0; index < files.length; index++) {
        const file = files[index];

        previewImage(file, position, () => {
            cur += 1;

            // console.log(`cur:${cur} fileLength:${files.length}`);

            if (cur === files.length) {
                console.log('预览结束');
                gallery = new Viewer(document.querySelector('.prev-list'));
            }
        });
    }

}

download.onclick = () => {
    if (!position) {
        alert("请先框选剪裁区域")
        return;
    }
    for (let file of files) {
        cropAndDownloadImage(file, position);
    }
}