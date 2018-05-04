echo "******** Print invalidate value *********"
grep "upload\|delete" s3-log.txt | sed -e "s|.*upload.*to s3://${bucket_name}/|/|" | sed -e "s|.*delete: s3://${bucket_name}/|/|" | sed -e 's/index.html//' | sed -e 's/\(.*\).html/\1/' | tr '\n' ' ' | xargs echo

echo "******** Set invalidate value *********"
#grep "upload\|delete" s3-log.txt | sed -e "s|.*upload.*to s3://${bucket_name}/|/|" | sed -e "s|.*delete: s3://${bucket_name}/|/|" | sed -e 's/index.html//' | sed -e 's/\(.*\).html/\1/' | tr '\n' ' ' | xargs aws cloudfront create-invalidation --distribution-id ${cloudfront_distribution_id} --paths