const fs = require('fs');
const path = require('path');

// ვიდეო ფაილების გადატანის სკრიპტი
class VideoTransfer {
  constructor() {
    this.sourceDir = './public/videos';
    this.destinationDir = './transferred-videos';
    this.videoFiles = [
      'ilia-1.mp4',
      'ilia-2.mp4', 
      'ilia-3.mp4',
      'vazha-1.mp4',
      'vazha-2.mp4'
    ];
  }

  // დირექტორიის შექმნა
  createDestinationDirectory() {
    if (!fs.existsSync(this.destinationDir)) {
      fs.mkdirSync(this.destinationDir, { recursive: true });
      console.log(`✅ შეიქმნა დირექტორია: ${this.destinationDir}`);
    }
  }

  // ფაილის გადატანა
  async transferFile(sourcePath, destPath) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destPath);
      
      let transferredBytes = 0;
      const stats = fs.statSync(sourcePath);
      const totalBytes = stats.size;

      readStream.on('data', (chunk) => {
        transferredBytes += chunk.length;
        const progress = ((transferredBytes / totalBytes) * 100).toFixed(2);
        process.stdout.write(`\r📁 გადატანა: ${progress}%`);
      });

      readStream.on('end', () => {
        console.log(`\n✅ წარმატებით გადატანილი: ${path.basename(sourcePath)}`);
        resolve();
      });

      readStream.on('error', (error) => {
        console.error(`❌ შეცდომა ფაილის გადატანისას: ${sourcePath}`, error.message);
        reject(error);
      });

      writeStream.on('error', (error) => {
        console.error(`❌ შეცდომა ფაილის ჩაწერისას: ${destPath}`, error.message);
        reject(error);
      });

      readStream.pipe(writeStream);
    });
  }

  // ყველა ვიდეო ფაილის გადატანა
  async transferAllVideos() {
    console.log('🎬 ვიდეო ფაილების გადატანა იწყება...\n');
    
    this.createDestinationDirectory();
    
    const results = {
      successful: [],
      failed: []
    };

    for (const videoFile of this.videoFiles) {
      const sourcePath = path.join(this.sourceDir, videoFile);
      const destPath = path.join(this.destinationDir, videoFile);

      try {
        if (fs.existsSync(sourcePath)) {
          await this.transferFile(sourcePath, destPath);
          results.successful.push(videoFile);
        } else {
          console.log(`⚠️ ფაილი არ არსებობს: ${sourcePath}`);
          results.failed.push(videoFile);
        }
      } catch (error) {
        console.error(`❌ შეცდომა ${videoFile}-ის გადატანისას:`, error.message);
        results.failed.push(videoFile);
      }
    }

    this.printSummary(results);
  }

  // შედეგების ბეჭდვა
  printSummary(results) {
    console.log('\n📊 გადატანის შედეგები:');
    console.log('='.repeat(50));
    
    if (results.successful.length > 0) {
      console.log('✅ წარმატებით გადატანილი ფაილები:');
      results.successful.forEach(file => {
        console.log(`   • ${file}`);
      });
    }

    if (results.failed.length > 0) {
      console.log('\n❌ ვერ გადატანილი ფაილები:');
      results.failed.forEach(file => {
        console.log(`   • ${file}`);
      });
    }

    console.log(`\n📁 გადატანილი ფაილები მოთავსებულია: ${this.destinationDir}`);
  }

  // ფაილების ინფორმაციის ბეჭდვა
  printFileInfo() {
    console.log('📋 ვიდეო ფაილების ინფორმაცია:');
    console.log('='.repeat(50));
    
    this.videoFiles.forEach(file => {
      const filePath = path.join(this.sourceDir, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`📁 ${file}: ${sizeInMB} MB`);
      } else {
        console.log(`❌ ${file}: ფაილი არ არსებობს`);
      }
    });
  }
}

// სკრიპტის გაშვება
async function main() {
  const transfer = new VideoTransfer();
  
  console.log('🎬 ვიდეო გადატანის სისტემა');
  console.log('='.repeat(50));
  
  // ფაილების ინფორმაციის ბეჭდვა
  transfer.printFileInfo();
  console.log();
  
  // ვიდეოების გადატანა
  await transfer.transferAllVideos();
}

// სკრიპტის გაშვება
if (require.main === module) {
  main().catch(error => {
    console.error('❌ კრიტიკული შეცდომა:', error.message);
    process.exit(1);
  });
}

module.exports = VideoTransfer; 