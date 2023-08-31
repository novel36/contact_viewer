<script>
    import { onMount } from 'svelte';
    import vCardParser from 'vcard-parser';
  
    onMount(async () => {
      const response = await fetch("$app/assets/Contacts.vcf");
      const vcardData = await response.text();
  
      const parsedVCard = vCardParser.parse(vcardData);
      console.log(parsedVCard);
    });
  </script>