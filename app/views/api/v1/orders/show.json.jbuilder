json.partial! 'order', order: @order

json.status_histories @order.audits do |audit|
  json.extract! audit, :version, :action, :audited_changes, :created_at
end
