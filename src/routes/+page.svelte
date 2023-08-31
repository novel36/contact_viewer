<script>
// @ts-nocheck
import { parse } from 'vcf';

// @ts-ignore


	
  
	let selectedFileName = '';
	let errorMessage = '';
	/**
	 * @type {any[]}
	 */
	let parsedData = [];
  
	// @ts-ignore
	async function parseVCF(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const vcfData = event.target.result;
      const vcf = parse(vcfData);

      const contacts = vcf.map((entry) => {
        let name = entry.get('fn');
        const photo = entry.get('photo');
        const number = entry.get('tel');

        return { name, photo, number };
      });

      const processedContacts = contacts.map((contact) => {
        let name = contact.name;
		console.log("############### Here ######################")
				decodeQuotedPrintable(name._data)
				
				console.log("#####################################")
        if (!name || typeof name === 'undefined') {
			console.log("#####################################")
				console.log(namePart)
				console.log("#####################################")
          name = 'NoName';
        } else if (Array.isArray(name)) {
          const decodedName = name.map((namePart) => {
            if (typeof namePart === 'string') {
				console.log("#####################################")
				console.log(namePart)
				console.log("#####################################")
              return namePart;
            } else if (namePart.charset === 'UTF-8' && namePart.encoding === 'QUOTED-PRINTABLE') {
				console.log("############# UTF-8 ########################")
				console.log(namePart)
				console.log("#####################################")
				return namePart;
            } else {
              return '';
            }
          });

          name = decodedName.join('');
        }

        return { ...contact, name };
      });

      const jsonContacts = JSON.stringify(processedContacts, null, 2);

      const link = document.createElement('a');
      link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonContacts);
      link.download = 'contacts.json';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      resolve();
    };

    reader.onerror = (event) => {
      reject(event.target.error);
    };

    reader.readAsText(file);
  });
}

function decodeQuotedPrintable(encodedText) {
  // Replace encoded special characters with their actual values
  var decodedText = encodedText.replace(/=([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode(parseInt(p1, 16));
  });
  console.log("&&&&&&&&&&&&&")
  console.log(encodedText)
  console.log("&&&&&&&&&&&&&")

  // Decode percent-encoded sequences
  decodedText = decodeURIComponent(decodedText);
  console.log("%%%%%%%%%")

  console.log(decodedText)
  console.log("%%%%%%%%%")

  // Return the decoded text
  return decodedText;
}

	/**
	 * @param {{ target: { files: any[]; }; }} event
	 */
	function handleFileChange(event) {
	  const file = event.target.files[0];
	  console.log("hello")
	  selectedFileName = file.name;
	  parseVCF(file);
	}
  
	/**
	 * @param {{ preventDefault: () => void; }} event
	 */
	function handleDragOver(event) {
	  event.preventDefault();
	}
  
	/**
	 * @param {{ preventDefault: () => void; dataTransfer: { files: any[]; }; }} event
	 */
	function handleDrop(event) {
	  event.preventDefault();
	  const file = event.dataTransfer.files[0];
	  selectedFileName = file.name;
	  parseVCF(file);
	}
  </script>
  
  <div class="text-center">
	<h1 class="text-center font-semibold text-3xl py-6">Contact</h1>
  
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
	  class="flex items-center justify-center w-1/3 mx-auto"
	  on:drop|preventDefault={handleDrop}
	  on:dragover|preventDefault={handleDragOver}
	>
	  <label
		for="dropzone-file"
		class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
	  >
		<div class="flex flex-col items-center justify-center pt-5 pb-6">
		 
		  <p class="mb-2 text-sm text-gray-500">
			<span class="font-semibold">Click to upload the VCF file or drag and drop it here.</span>
		  </p>
		  <p class="text-xs text-gray-500">(Supported file format: .vcf)</p>
		</div>
		<input
		  id="dropzone-file"
		  type="file"
		  class="hidden"
		  accept=".vcf"
		  on:change={handleFileChange}
		/>
		<p class="text-xs text-gray-500">(Dropzone)</p>
	  </label>
	</div>
  
	{#if selectedFileName}
	  <div class="mt-4">
		<p class="text-sm font-semibold">Selected file:</p>
		<p class="text-sm">{selectedFileName}</p>
	  </div>
	{/if}
  
	{#if errorMessage}
	  <div class="mt-4">
		<p class="text-sm ">{errorMessage}</p>
	  </div>
	{/if}
	<button type="button" on:click={() => parseVCF(document.getElementById('dropzone-file').files[0])} class='px-6 bg-blue-300 font-mono rounded-sm text-white hover:font-bold mt-6'>Parse</button>
	{#if parsedData}
	  <div class="mt-4 w-1/3 px-6 mx-auto">
		<p class="text-sm font-semibold">Parsed contacts:</p>
		{#each parsedData as contact}
		  <div class="flex flex-row space-x-5 justify-evenly py-2">
			<div class='shadow-sm flex-1 p-3 rounded-md'>{contact.name}</div>
			<div class="shadow-sm flex-1 p-3 rounded-md">{contact.phoneNumber}</div>
		  </div>
		{/each}
	  </div>
	{/if}
  </div>